/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Domain Model  //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type NewAccountInfo = {
    userName: string,
    password: string
};

export type BuildNewAccount = (newAccountInfo: NewAccountInfo) => NewAccount;

export type NewAccount = {
    getId: () => string;
    getUserName: () => string;
    getHashedPassword: () => string;
};

export type NewUserProfile = {
    getUserName: () => string;
    getAlias: () => string;
    getDescription: () => string | undefined;
    getImageByteArray: () => Int8Array | undefined;
};

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Services ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type AddNewAccount = (newAccountInfo: NewAccountInfo) => Promise<string>;

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  infrastructure ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type IdHandler = {
    getId: () => string;
    isValid: (id: string) => boolean;
};

export type HashHandler = {
    hash: (input: string) => string;
};

export type AccountRepository = {
    insertNewAccount: (newAccount: NewAccount) => Promise<string>;
};