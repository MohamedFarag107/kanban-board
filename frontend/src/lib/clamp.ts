export interface ClampOptions {
  length?: number;
  omission?: string;
}

export const clamp = (
  str: string,
  { length = 30, omission = "..." }: ClampOptions = {}
) => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}${omission}`;
};
