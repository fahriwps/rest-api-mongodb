import User from '../models/user.model';

export const validateUsername = async (username: string): Promise<string | null> => {
    // Username must not be blank
    if (!username.trim()) {
        return 'Username must not be blank';
    }

    // Username must be unique by checking existing username in DB
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return 'Username must be unique'
    }

    return null; // No error found
};

export const validatePassword = (password: string): string | null => {
    // Password min length should be 8
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    // Password should contain alphanumeric characters
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (!alphanumericRegex.test(password)) {
        return 'Password must contain both letters and numbers';
    }

    return null;
};

export const validateRole = (role: string): boolean => {
    // Role should be either 'maker' or 'approver'
    return role === 'maker' || role === 'approver';
}