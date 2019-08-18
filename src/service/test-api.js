import agentFixture from './fixtures/agent.fixture.json';
import deliveryFixture from './fixtures/delivery.fixture.json';
import settlementFixture from './fixtures/settlement.fixture.json';
import pickupFixture from './fixtures/pickup.fixture.json';

export const api = {
  getAgent: options => {
    return {
      ok: true,
      data: agentFixture,
      ...options,
    };
  },
  putAgent: options => {
    return Object.assign(
      {
        ok: true,
        data: agentFixture,
      },
      options
    );
  },
  getDelivery: options => {
    return Object.assign(
      {
        ok: true,
        data: deliveryFixture,
      },
      options
    );
  },
  getPickup: options => {
    return Object.assign(
      {
        ok: true,
        data: pickupFixture,
      },
      options
    );
  },
  getSettlement: options => {
    return Object.assign(
      {
        ok: true,
        data: settlementFixture,
      },
      options
    );
  },
  deletePickup: options => {
    return Object.assign(
      {
        ok: true,
        data: null,
      },
      options
    );
  },
  deleteDelviery: options => {
    return Object.assign(
      {
        ok: true,
        data: null,
      },
      options
    );
  },
  addPickupPoint: data => ({ data, ok: true }),
  updatePickupPoint: data => ({ data, ok: true }),
  getOrders: () => ({
    data: {
      items: [
        {
          id: 1,
          order_status: {
            name: 'test status',
          },
          contact_person: 'test person',
          created_at: '2018-10-20 11:23:23+05',
          updated_at: '2018-11-21 11:25:23+05',
          items: [
            {
              id: 123,
              item_name: 'test item_name',
              price: 'test price',
              qty: 'test qty',
              total: 'test total',
              item_url: 'test item_url',
            },
          ],
        },
      ],
      _meta: {
        perPage: 50,
        currentPage: 1,
      },
    },
    ok: true,
  }),
  getUser: options => {
    return Object.assign(
      {
        ok: true,
        data: {
          items: [],
        },
      },
      options
    );
  },
  cancelOrderByClient: () => {
    return {
      ok: true,
      data: {
        jp_order_status_id: 2,
      },
    };
  },
  confirmOrderCall: () => ({
    ok: true,
    data: {
      jp_order_status_id: 8,
    },
  }),
  postOrderPinCode: (orderId, pinCode) => ({
    ok: true,
    data: {
      order_id: orderId,
      pin: pinCode,
    },
  }),
  postPinCodeSend: orderId => ({
    ok: true,
    data: {
      order_id: orderId,
    },
  }),
};
