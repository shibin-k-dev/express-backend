import { Router } from "express";
import { AddData , GetSingleData ,DeleteData ,updateData ,Login ,Deleteuser, GetData, GetSingleuser, getuser, Register, updateuser } from "./reqhandler.js";
import { AUth } from "./middilewar/auth.js";




const router = Router();

router.route('/adddata').post(AUth,AddData)
router.route('/get').get(GetData)
router.route('/getdata/:id').get(GetSingleData) 
router.route('/delete/:id').delete(DeleteData);
router.route('/update/:id').put(updateData);

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/getuser/:id').get(GetSingleuser);
router.route('/deleteuser/:id').delete(Deleteuser);
router.route('/updateuser/:id').put(updateuser);


export default router
