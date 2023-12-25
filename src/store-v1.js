import { comBineReducers, createStore } from "redux";

const intialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};


const intialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = intialStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return { ...state, balance: state.balance + action.payload };
    }
    case "account/withdraw": {
      return { ...state, balance: state.balance - action.payload };
    }
    case "account/requestLoan": {
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };
    }
    case "account/payLoan": {
      return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };
    }
    default:
      return state;
  }
}

function customerReducer(state = intialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt };
    case "customer/updateName":
      return {
        ...state,
        fullNmae: action.payload,
      };
    default:
      return;
  }
}

const rootReducer = comBineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan(amount) {
  return {
    type: "account/payLoan",
  };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(100, "Buy cheap car"));
console.log(store.getState());

store.dispatch(payLoan());

console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toIOSSring() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Yokubjanovich", "2241"));
