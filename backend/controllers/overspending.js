const OverspendingSchema = require("../models/OverspendingModel")


exports.addOverspending = async (req, res) => {
    const {title, amount, description}  = req.body

    const income = OverspendingSchema({
        title,
        amount,
        description
    })

    try {
        //validations
        if(!title || !description ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Overspending Area Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getOverspending = async (req, res) =>{
    try {
        const incomes = await OverspendingSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteOverspending = async (req, res) =>{
    const {id} = req.params;
    OverspendingSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Overspending Area Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}