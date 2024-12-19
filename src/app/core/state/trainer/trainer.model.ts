export interface TrainerStateModel {
  status: TrainerStatus;
  trainer?: Trainer;
}

export type TrainerStatus = 'disconnected' | 'connecting' | 'connected';

export interface Trainer {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface TrainerJSON {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export function hydrateTrainer(data: TrainerJSON): Trainer {
  return {
    id: data?.id,
    name: data?.name,
    created_at: new Date(data?.created_at),
    updated_at: new Date(data?.updated_at),
  };
}
