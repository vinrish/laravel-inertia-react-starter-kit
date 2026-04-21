export function getPasswordStrength(password: string) {
    let score = 0;

    if (!password) return { score: 0, label: 'empty' };

    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: 'weak' };
    if (score <= 3) return { score, label: 'medium' };
    return { score, label: 'strong' };
}
