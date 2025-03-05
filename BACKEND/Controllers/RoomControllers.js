const Room = require("../Model/RoomModel");

//data display 
const getAllRoom = async (req, res, next) => {
    let rooms; // Change variable name to avoid confusion

    try {
        rooms = await Room.find(); // Use lowercase 'room'
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }


      // not found Room
      if(!rooms){
        return res.status(404).json({message :"Room not found"});

    }

    // Return all rooms
    return res.status(200).json({ rooms });
};

//add room details (payment)
const addRooms = async (req, res, next) => {
    const { RoomName, PersonName, Description, Price, EmailAddress  } = req.body;

    let room; // Use singular because it's just one room

    try {
        room = new Room({ RoomName, PersonName, Description, Price, EmailAddress  });
        await room.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding room" });
    }

    // If room not added
    if (!room) {
        return res.status(400).json({ message: "Unable to add room" });
    }

    return res.status(200).json({ room });
};

//Get by ID
const getById = async (req,res,next)=>{

    const id=req.params.id;

    let room;

    try{
        room= await Room.findById(id);

    }catch(err){
        console.log(err);
    }

    //  not available room
    if (!room) {
        return res.status(400).json({ message: "room not found" });
    }

    return res.status(200).json({ room });


}

//update payment

const UpdateRoom = async (req, res, next) => {
    const id = req.params.id;
    const {RoomName, PersonName, Description, Price, EmailAddress  } = req.body;

    let room;

    try {
        room = await Room.findByIdAndUpdate(
            id,
            { RoomName, PersonName, Description, Price, EmailAddress  },
            { new: true } // This ensures the updated document is returned
        );

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating room" });
    }

    return res.status(200).json({ room });
};


//delete room
const deleteRoom = async(req,res,next)=>{
    const id= req.params.id;

    let room;

    try{
        room = await Room.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
    if (!room) {
        return res.status(400).json({ message: "unable to delete" });
    }

    return res.status(200).json({ room });
}

// Export properly
module.exports = { getAllRoom ,addRooms,getById,UpdateRoom,deleteRoom};

