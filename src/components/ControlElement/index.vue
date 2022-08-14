<template>
    <view class="control-element">
        <view class="control-element_name">
            {{ elementData.ename || "" }}
        </view>

        <view class="control-element_el">
            <switch :checked="checke" color="#12CE66" style="transform: scale(0.5)" @change="handleChange" />
        </view>
    </view>
</template>

<script>
import { defineComponent, computed, toRefs, nextTick } from "vue";
import homeApi from "@/api/home";

export default defineComponent({
    props: {
        deviceID: {
            type: Number,
            default: 0,
        },
        elementData: {
            type: Object,
            default: () => ({
                datetime: "",
                ekey: "",
                ename: "",
                enum: "",
                evalue: 0,
            }),
        },
    },
    setup(props) {
        const { deviceID, elementData } = toRefs(props);
        const checke = computed({
            set(v) {
                elementData.value.evalue = v ? 1 : 0
            },
            get() {
                return elementData.value.evalue === 1 ? true : false
            }
        })

        async function handleChange({ detail }) {

            const state = detail.value ? 1 : 0
            elementData.value.evalue = state
            uni.showLoading({
                title: "操作中..."
            });
            try {
                const res = await setRelay(state)
                // if (!res) {
                //     throw new Error("操作失败")
                // }
            } catch (error) {
                setTimeout(() => {
                    uni.showToast({
                        title: "操作失败",
                        icon: "none"
                    })
                });
                console.error(error)

                nextTick(() => {
                    elementData.value.evalue = detail.value ? 0 : 1
                })
            }

            uni.hideLoading()
        }

        async function setRelay(state) {
            await homeApi.setRelay({
                deviceId: deviceID.value,
                relayNum: Number(elementData.value.enum),
                relayState: state,
            });
        }

        return {
            checke,
            handleChange,
        };
    },
});
</script>

<style lang="scss" scoped>
.control-element {
    width: 100%;
    box-sizing: border-box;
    height: 146rpx;
    background: #ffffff;
    box-shadow: 0px 8rpx 15rpx 0px rgba(6, 125, 255, 0.1);
    border-radius: 8rpx;
    margin-bottom: 30rpx;
    padding: 30rpx 20rpx;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-grow: 1;

    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #333333;
    letter-spacing: 0.67rpx;
    font-weight: 400;

    &_el {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>
