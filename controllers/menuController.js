const validator = require("./../validators/menu/menuValidator")
const { model: menuModel } = require("./../models/Menu")
const { isValidObjectId } = require("mongoose")

const create = async (req, res) => {
    const resultValid = validator(req.body)

    if (resultValid !== true) {
        return res.status(409).json(resultValid)
    }

    const {
        title,
        href,
        parentMenu
    } = req.body

    await menuModel.create({ title, href, parentMenu })
    return res.status(201).json({ message: "menu create successfully .." })
}

const getAll = async (req, res) => {
    const allMenu = await menuModel.find({}, "-__v -createdAt -updatedAt").lean()

    allMenu.forEach(menu => {
        let subMenus = []

        for (let i = 0; i < allMenu.length; i++) {
            let mainMenu = allMenu[i]
            if (String(mainMenu.parentMenu) == String(menu._id)) {
                subMenus.push(allMenu.splice(i,1)[0])
                i = i - 1
            }
        }

        menu.subMenus = subMenus

    })

    return res.json(allMenu)

    // let menus = []

    // allMenu.forEach(menu => {
    //     allMenu.forEach(subMenu => {
    //         if (String(subMenu.parentMenu) == String(menu._id)) {
    //             menus.push({
    //                 ...menu,
    //                 subMenu: [...subMenu ,subMenu]
    //             })
    //         }

    //     })


    // })

    return res.json(allMenu)
}

const remove = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "the id not valid .." })
    }

    const removeMenu = await menuModel.findOneAndDelete({ _id: id })
    if (!removeMenu) {
        return res.status(404).json({ message: "menu not found .." })
    }

    return res.json({ message: "delete menu successfully .." })
}

const edit = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "the id not valid .." })
    }

    const resultValid = validator(req.body)

    if (resultValid !== true) {
        return res.status(409).json(resultValid)
    }

    const {
        title,
        href,
        parentMenu
    } = req.body

    const editMenu = await menuModel.findOneAndUpdate({ _id: id }, { title, href, parentMenu })
    if (!editMenu) {
        return res.status(404).json({ message: "menu not found .." })
    }

    return res.json({ message: "edit menu successfully .." })
}

module.exports = { create, getAll, remove, edit }