const { Photon } = require('@generated/photon')
const photon = new Photon()

async function main() {
  const user1 = await photon.users.create({
    data: {
      username: 'joannaasdfa carrier',
      articles: {
        create: {
            title: 'How to XYZ',
            url: 'https://www.google.com/'
          },
      },
    },
  })
  console.log({ user1 })

  const category1 = await photon.categories.create({
    data: {
      type: 'Science',
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
