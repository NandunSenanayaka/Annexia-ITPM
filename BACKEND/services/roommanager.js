const room = require('../Model/RoomModel'); // Ensure the path is correct.


class RoomServices{

    async createroom(roomData) {
        return await room.create(roomData);
    }

    async getAllrooms(){
        return await room.find();
    }

    async getroomByID(id){
        return await room.findById(id);
    } 

    async updateroom(id,updateData){
        return await room.findByIdAndUpdate(id,updateData);
        
    }

    async deleteroom(id){
        return await room.findByIdAndDelete(id);
    }

}
module.exports = new RoomServices();