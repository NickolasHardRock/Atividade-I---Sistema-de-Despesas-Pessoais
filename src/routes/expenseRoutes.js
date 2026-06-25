import express from 'express';
import expenseView from '../view/expenseView.js';


const router = express.Router()

router.get('/',expenseView.getExpense);
router.post('/',expenseView.create);
router.put('/:id',expenseView.update);
router.delete('/:id',expenseView.delete);

export default router;