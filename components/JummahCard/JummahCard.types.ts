export interface JummahCardProps {
  isNext: boolean;
  times: Date[];
}

export interface JummahServiceViewModel {
  key: string;
  label: string;
  time: string;
}

export interface JummahCardViewModel {
  fridayLabel: string;
  services: JummahServiceViewModel[];
  title: string;
}
