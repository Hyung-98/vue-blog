// const getUserInfo = (userId) => {
//     const reqData = {
//         user_id: userId,
//     };

//     return {
//         data: {
//             user_id: reqData.user_id,
//             user_token: 'user_test_token',
//             user_role: 'ADM',
//         },
//     };
// };

// export default {
//     async doLogin(userId) {
//         try {
//             const getUserInfoPromise = getUserInfo(userId);
//             const [userInfoResponse] = await Promise.all([getUserInfoPromise]);
//             if (userInfoResponse.data.length === 0) {
//                 return 'notFound';
//             } else {
//                 localStorage.setItem('user_token', userInfoResponse.data.user_token);
//                 localStorage.setItem('user_role', userInfoResponse.data.user_role);
//                 return userInfoResponse;
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     },
// };
