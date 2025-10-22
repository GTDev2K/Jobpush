const { reverseGeocode } = require('./apiUtilis');

// verifie si cela renvoie bien toute les valeurs d'adresse quand on envoie la longitude et la latitude
describe('reverseGeocode', () => {  
  it('should return an address object for Paris coordinates', async () => {
    const latitude = 48.8566;
    const longitude = 2.3522;
    const address = await reverseGeocode(latitude, longitude);

    expect(address).toHaveProperty('streetNumber');
    expect(address).toHaveProperty('streetName');
    expect(address).toHaveProperty('city');
    expect(address).toHaveProperty('zipCode');
    expect(typeof address.city).toBe('string');
  });
});