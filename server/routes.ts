import { Router } from 'express';
import { prisma } from './prisma';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World' });
});

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

router.post('/apps/new', async (req, res) => {
  const { name, email } = req.body;
  const app = await prisma.app.create({
    data: {
      name,
      owner: { connect: { email } },
    },
  });
  res.status(202).send(app);
});

router.get('/apps/:id', async (req, res) => {
  const { id } = req.params;
  const app = await prisma.app.findFirst({
    where: { id },
  });
  res.status(200).send(app);
});

export default router;
