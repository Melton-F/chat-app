import Util from "./utilModel"

exports.create = async (req, res)=>{
    const util = await new Util({
        output:req.body.output
    })
    util.save()
}