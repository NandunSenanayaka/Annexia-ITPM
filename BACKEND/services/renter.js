const renter = require('../Model/RenterModel'); // Ensure the path is correct.


class RenterServices{

    async createrenter(renterData) {
        return await renter.create(renterData);
    }

    async getAllrenters(){
        return await renter.find();
    }

    async getrenterByID(id){
        return await renter.findById(id);
    } 

    async updaterenter(id,updateData){
        return await renter.findByIdAndUpdate(id,updateData);

    }

    async deleterenter(id){
        return await renter.findByIdAndDelete(id);
    }

}
module.exports = new RenterServices();