import { connection } from "../connection";

import {
  selectAddressByUserIdTemplate,
  selectCountOfUsersTemplate,
  selectUsersTemplate,
  selectUsersWithAddressTemplate,
} from "./query-templates";
import { Address, User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

// export const getUsers = (
//   pageNumber: number,
//   pageSize: number
// ): Promise<User[]> =>
//   new Promise((resolve, reject) => {
//     connection.all<User>(
//       selectUsersTemplate,
//       [pageNumber * pageSize, pageSize],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         resolve(results);
//       }
//     );
//   });

  export const getUserAddress = (userId: number): Promise<Address | null> =>
    new Promise((resolve, reject) => {
      connection.get<Address>(selectAddressByUserIdTemplate, [userId], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results || null);
      });
    });
  
  export const getUsers = (pageNumber: number, pageSize: number): Promise<(User & { address?: Address })[]> =>
    new Promise((resolve, reject) => {
      connection.all<User & Address>(
        selectUsersWithAddressTemplate,
        [pageNumber * pageSize, pageSize],
        (error, results) => {
          console.log(results, 'THE RESULTS');

          if (error) {
            reject(error);
          }
  
          const formattedResults = results.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.street
              ? {
                  street: user.street,
                  city: user.city,
                  state: user.state,
                  zipcode: user.zipcode,
                }
              : undefined,
          }));
  
          resolve(formattedResults);
        }
      );
    });