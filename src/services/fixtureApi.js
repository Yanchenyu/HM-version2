// export default {
//     getFixRoomControlData: () => {
//         return {
//             Code: 0,
//             Data: {"name":'12'}
//         }
//     }
// }
export const getFixRoomControlData = () => {
    return {
        Code: 0,
        Data: require("../fixtures/roomControl.json")
    }
}