import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
 const user = await prisma.user.create({
  data: {
    nome: 'Diego',
    email:'email@email.com',
    avatarUrl: 'https://github.com/diego3g.png',
  }
 })

 const pool = await prisma.pool.create({
  data: {
    title: 'Examplo Pool',
    code: 'bol137',
    ownerId: user.id,

    participants: {
      create: {
        userId: user.id
      }
    }
  }
 })

 await prisma.game.create({
  data: {
    date: '2022-12-04T20:31:48.115Z',
    firstTeamCountryCode: 'DE',
    secondTeamCountryCode: 'BR',
  }
 })

 await prisma.game.create({
  data: {
    date: '2022-12-04T20:31:48.115Z',
    firstTeamCountryCode: 'BR',
    secondTeamCountryCode: 'AR',

    guesses: {
      create: {
        firstTeamPoints:  2,
        secondTeamPoints: 1,
        participant: {
          connect: {
            userId_poolId: {
              userId: user.id,
              poolId: pool.id,
            }
          }
        }
      }
    }
  }
 })

}

main()