class Pokemon {
  name: string;
  url: string;
  sprite?: string;
  types: string[] = [];
  weight?: number;
  height?: number;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

export default Pokemon;
