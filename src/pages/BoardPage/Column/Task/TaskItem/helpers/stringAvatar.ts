function stringToColor(string: string) {
  let hash = 0;
  let index;

  for (index = 0; index < string.length; index += 1) {
    hash = string.charCodeAt(index) + ((hash << 5) - hash);
  }

  let color = '#';

  for (index = 0; index < 3; index += 1) {
    const value = (hash >> (index * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 30,
      height: 30,
    },
    children: `${name.substring(0, 1)}`,
  };
}
