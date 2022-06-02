import { randomUUID } from 'crypto';
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
  const rootComponentId = randomUUID();
  const app = await prisma.app.create({
    data: {
      name,
      owner: { connect: { email } },
      routes: {
        create: {
          title: 'home',
          path: '/',
          slug: 'home',
          page: {
            create: {
              rootComponentId,
              components: {
                create: {
                  id: rootComponentId,
                  componentLibraryId: 'root',
                },
              },
            },
          },
        },
      },
    },
  });
  res.status(202).send(app);
});

router.get('/apps/:id', async (req, res) => {
  const { id } = req.params;
  const app = await prisma.app.findFirst({
    where: { id },
    include: {
      routes: {
        include: {
          page: true,
        },
      },
    },
  });
  res.status(200).send(app);
});
router.delete('/apps/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.app.delete({ where: { id } });
  console.log('deleted app');
  res.status(204).send();
});

router.post('/apps/:id/routes', async (req, res) => {
  const { id } = req.params;
  const rootComponentId = randomUUID();
  const updatedApp = await prisma.app.update({
    where: { id },
    data: {
      routes: {
        create: {
          title: 'home',
          path: '/',
          slug: 'home',
          page: {
            create: {
              rootComponentId,
              components: {
                create: {
                  id: rootComponentId,
                  componentLibraryId: 'root',
                },
              },
            },
          },
        },
      },
    },
  });
  console.log('updated app');
  res.status(202).send(updatedApp);
});

router.get('/dashboard/:userId', async (req, res) => {
  const apps = await prisma.app.findMany();
  console.log({ apps });
  res.status(200).send(apps);
});

export default router;
