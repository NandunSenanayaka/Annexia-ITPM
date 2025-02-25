const renter_service = require("../services/renter");

class OwnerController {

    async createrenter(req, res) {
        try {
            const renter = await renter_service.createrenter(req.body);
            res.status(201).json(renter);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllrenters(req, res) {
        try {
            const renters = await renter_service.getAllrenters();
            res.status(200).json(renters);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getrenterById(req, res) {
        try {
            const renter = await renter_service.getrenterByID(req.params.id);
            if (!renter) {
                return res.status(404).json({ message: "Renter Not Found" });
            }
            res.status(200).json(renter);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updaterenter(req, res) {
        try {
            const renter = await renter_service.updaterenter(req.params.id, req.body);
            if (!renter) {
                return res.status(404).json({ message: "Renter Not Found" });
            }
            res.status(200).json(renter);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleterenter(req, res) {
        try {
            const renter = await renter_service.deleterenter(req.params.id);
            if (!renter) {
                return res.status(404).json({ message: "Renter Not Found" });
            }
            res.status(200).json({ message: "Renter deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OwnerController();
