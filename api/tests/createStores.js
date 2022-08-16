const db = require("../db");

const createStores = async (userIds) => {
  const firstUserId = userIds[0];
  const secondUserId = userIds[1];

  if (!firstUserId || !secondUserId) {
    throw new Error(`No first or second id found in ${userIds.join(", ")}`);
  }

  await db.query(`
    INSERT INTO store (user_id, name, location, zipcode, logo, description)
    VALUES (
        ${firstUserId},
        'Zara',
        '865 Market St space 217, San Francisco, CA',
        '94103',
        'https://static.dezeen.com/uploads/2019/02/new-zara-logo-hero-1.jpg',
        'Zara is one of the biggest international fashion companies, and it belongs to Inditex, one of the world's largest distribution groups. The customer is at the heart of our unique business model, which includes design, production, distribution, and sales, through our extensive retail network.',
    ),(
        ${firstUserId},
        'American Eagle Outfitters',
        '448 Hillsdale S C Space N 02, San Mateo, CA',
        '94403',
        'https://1000logos.net/wp-content/uploads/2021/05/American-Eagle-logo.png',
        'American Eagle Outfitters® (NYSE: AEO) is a leading global specialty retailer offering high-quality, on-trend clothing, accessories and personal care products at affordable prices under its American Eagle® and Aerie® brands.',
    ),(
        ${firstUserId},
        'Abercrombie & Fitch',
        '428 Sun Valley Mall, Concord, CA',
        '94520',
        'https://i.pinimg.com/originals/c3/6a/53/c36a53a8114ef8d60887f98f24b4a472.png',
        'Abercrombie & Fitch Co. (NYSE: ANF) is a leading, global, omnichannel specialty retailer of apparel and accessories for men, women and kids through five renowned brands. The iconic Abercrombie & Fitch brand was born in 1892 and aims to make every day feel as exceptional as the start of a long weekend.',
    ),(
        ${secondUserId},
        'Aritzia',
        '865 Market St, San Francisco, CA',
        '94103',
        'https://download.logo.wine/logo/Aritzia/Aritzia-Logo.wine.png',
        'Aritzia is a design house with an innovative global platform. We are creators and purveyors of Everyday Luxury, home to an extensive portfolio of exclusive brands for every function and individual aesthetic. We pride ourselves on creating immersive, and highly personalized shopping experiences at aritzia.com and in our 100+ boutiques throughout North America to everyone, everywhere.'
    ),(
        ${secondUserId},
        'Reformation',
        '2360 Fillmore St, San Francisco, CA',
        '94115',
        'https://digital.hbs.edu/platform-rctom/wp-content/uploads/sites/4/2016/11/small_logo-720x200.png',
        'We make everything from low-impact materials, rescued deadstock fabrics, and repurposed vintage clothing. Ref products are designed, shot, and shipped at our facilities in Los Angeles. We also make some of our stuff in our LA factory, and the rest at sustainable partner factories around the world.',
    ),(
        ${secondUserId},
        'Lululemon Athletica',
        '1981 Union St, San Francisco, CA 94123',
        '94123',
        'https://fontmeme.com/images/Lululemon_Athletica_logo.png',
        'Founded in Vancouver, Canada in 1998, lululemon athletica is a technical athletic apparel company for yoga, running, training and most other sweaty pursuits. Our Story. While Vancouver, Canada is where you can trace our beginnings, our global community is where you'll find our soul.',
    );
  `);
  const results = await db.query(`SELECT id FROM store ORDER BY id ASC`);
  const ids = results.rows.map((row) => row.id);
};

module.exports = {
  createStores,
};
