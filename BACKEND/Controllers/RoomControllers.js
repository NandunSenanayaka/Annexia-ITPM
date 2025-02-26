const room_service = require("../services/roommanager");

class RoomController {

    async createroom(req, res) {
        try {
            const room = await room_service.createroom(req.body);
            res.status(201).json(room);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllrooms(req, res) {
        try {
            const rooms = await room_service.getAllrooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getroomById(req, res) {
        try {
            const room = await room_service.getroomByID(req.params.id);
            if (!room) {
                return res.status(404).json({ message: "room Not Found" });
            }
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateroom(req, res) {
        try {
            const room = await room_service.updateroom(req.params.id, req.body);
            if (!room) {
                return res.status(404).json({ message: "room Not Found" });
            }
            res.status(200).json(room);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteroom(req, res) {
        try {
            const room = await room_service.deleteroom(req.params.id);
            if (!room) {
                return res.status(404).json({ message: "room Not Found" });
            }
            res.status(200).json({ message: "room deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new RoomController();
