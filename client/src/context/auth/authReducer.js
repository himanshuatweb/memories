import { AUTH, LOGOUT } from '../types';
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      console.log('AUTH reducer runs.');
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action?.payload,
      };
    case LOGOUT:
      console.log('LOGOUT reducer runs.');
      localStorage.removeItem('profile');
      return {
        ...state,
        authData: null,
      };
    // case SIGN_IN:
    //   console.log('SIGN_IN reducer runs.');
    //   return state;
    // case SIGN_UP:
    //   console.log('SIGN_UP reducer runs.');
    //   return state;
    default:
      return state;
  }
};

export default authReducer;

// "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2NTBhMmNlNDdiMWFiM2JhNDA5OTc5N2Y4YzA2ZWJjM2RlOTI4YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NTYzOTY1NzcsImF1ZCI6Ijg5Mjk3MzE5MDM1Ni0zYTdxYzcybXZncGtwdW4xcjkwZTJnbXZpdG50bzUzaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMDM4OTE3ODIzNTI5MjY5MTc4NiIsImVtYWlsIjoiaGltYW5zaHV0aHVnQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI4OTI5NzMxOTAzNTYtM2E3cWM3Mm12Z3BrcHVuMXI5MGUyZ212aXRudG81M2kuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiSGltYW5zaHUgUmF3YXQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lFSVJHSkpkcVZ6QjJraHFHd2t3R3BsY2tyVUw5LWNkbV96anpOPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkhpbWFuc2h1IiwiZmFtaWx5X25hbWUiOiJSYXdhdCIsImlhdCI6MTY1NjM5Njg3NywiZXhwIjoxNjU2NDAwNDc3LCJqdGkiOiI3MTkzNzM0YThhODVmMGUwZWVhNjM0NzhlNGQ5MWIzNzk3OTRjODhjIn0.o9kQkJN7_nHl2bgw27kH6ISid64By8A4_HMr1Ctz19WWqcvywxT3m8-G7rX_9gfd-dSBO-MEdX59-Gn43jaD20IT-XqUfu8nA5yLV81EK5d4gzFEqqLM5qMh7RpxDOTrIM_H0EKDnjeNhUm8BpezTwceLRBUIMmjMEJpNIG4E8uK7TIC99ZZtriQ0kuNLFhzfGELjzxJowSbPDcrMot2j8bTXWZPJwgc-nROz15CMZwZVqyxESB11I4HhOmnEt8xYhGRbaP4elwihFgEdOOqvTtfQB1Gi7Ofmgbw3KkhTpWzFc3pwn9oIpUakcqIaAvYWEGTfHh8FZAl6bqcKiEGWw"
