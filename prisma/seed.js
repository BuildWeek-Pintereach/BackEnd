const { Photon } = require('@generated/photon')
const photon = new Photon()

async function main() {
  const user1 = await photon.users.create({
    data: {
      firstname: 'LC',
      lastname: 'Carrier',
      email: 'yo@lccarrier.com',
      password: '1234',
      articles: {
        create: {
            title: 'How to ABC',
            url: 'https://www.google.com/'
          },
      },
    },
  })
  console.log({ user1 })

  const category1 = await photon.categories.create({
    data: {
      type: 'Biology',
    }
  })

const category2 = await photon.categories.create({
    data: {
      type: 'Psychology',
    }
  })

const category3 = await photon.categories.create({
    data: {
      type: 'Technology',
    }
  })

  const category4 = await photon.categories.create({
    data: {
      type: 'Physics',
    }
  })

  const category5 = await photon.categories.create({
    data: {
      type: 'Health',
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
