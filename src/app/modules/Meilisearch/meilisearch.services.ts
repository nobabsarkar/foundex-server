/* eslint-disable no-console */
import meiliClient from '../../utils/meilisearch';

// const getAllItems = async (limit: number, searchTerm?: string) => {
//   const index = meiliClient?.index('items');

//   if (!index) {
//     throw new Error('MeiliSearch client or index not found');
//   }

//   const searchString = searchTerm || '';

//   try {
//     const result = await index.search(searchString, { limit });
//     return result;
//   } catch (error) {
//     console.error('Error searching MeiliSearch:', error);
//     throw error;
//   }
// };

const getAllItems = async (limit: number, searchTerm?: string) => {
  try {
    let index;

    try {
      index = await meiliClient.getIndex('items');
    } catch (e) {
      await meiliClient.createIndex('items', { primaryKey: 'id' });
      index = await meiliClient.getIndex('items'); // আবার পেতে হবে Index টাইপে
    }

    const searchString = searchTerm || '';
    const result = await index.search(searchString, { limit });

    return result;
  } catch (error) {
    console.error('Error searching MeiliSearch:', error);
    throw error;
  }
};

export const MeilisearchServices = {
  getAllItems,
};
