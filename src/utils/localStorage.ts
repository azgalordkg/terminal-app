export class LocalStorage {
  public static getStorage(name: string) {
    const data = localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    }
    return null;
  }

  public static setStorage(name: string, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}
