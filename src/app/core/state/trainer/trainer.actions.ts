export class TrainerLogin {
  static readonly type = '[Trainer] Login';

  constructor(public readonly token: string) {}
}

export class TrainerLogout {
  static readonly type = '[Trainer] Logout';
}

export class TrainerReset {
  static readonly type = '[Trainer] Reset';
}
