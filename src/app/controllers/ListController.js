const { User, Appointment } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class ListController {
    async index (req, res) {
        const date = moment(new Date());
        const { id } = res.locals.user;
        const providers = await Appointment.findAll({
            include: [{
                model: User
            }],
            where: {
                provider_id: id,
                date: {
                    [Op.between]: [
                        date.startOf("day").format(),
                        date.endOf("day").format()
                    ]
                }
            }
        });
        const available = providers.map(p => {

            const dates = moment(p.date);
            return { ...p, date: dates, avaliable: dates.isAfter(moment()) };
        });
        return res.render("adm/list", { providers: available, base: date });
    }
    async filter (req, res) {
        const date = moment(parseInt(req.params.date));
        const { id } = res.locals.user;
        const providers = await Appointment.findAll({
            include: [{
                model: User
            }],
            where: {
                provider_id: id,
                date: {
                    [Op.between]: [
                        date.startOf("day").format(),
                        date.endOf("day").format()
                    ]
                }
            }
        });
        const available = providers.map(p => {
            const dates = moment(p.date);
            return { ...p, date: dates, avaliable: dates.isAfter(moment()) };
        });
        return res.render("list/item", { providers: available, base: date });
    }
}

module.exports = new ListController();
