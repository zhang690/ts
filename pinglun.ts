class DataHelper {
  plKey: string;
  primaryKey: string;
  constructor(plKey: string, primaryKey: string) {
    this.plKey = plKey;
    this.primaryKey = primaryKey;
  }
  // 读取数据
  readData(): any {
    let arrStr: any | null = localStorage.getItem(this.plKey);
    let arr: Array<Object> = [];
    if (arrStr !== null) {
      arr = JSON.parse(arrStr);
      return arr;
    }
    return arr;
  }
  // 保存数据
  saveData(arr: Array<Object>): void {
    let arrStr: string = JSON.stringify(arr);
    localStorage.setItem(this.plKey, arrStr);
  }
  // 追加数据
  addData(content: string): number {
    let arr: any = this.readData();
    let obj: any = {
      content: content,
    };
    let newId = arr.length > 0 ? arr[arr.length - 1][this.primaryKey] + 1 : 1;
    obj[this.primaryKey] = newId;
    arr.push(obj);
    this.saveData(arr);
    return newId;
  }
  // 删除数据
  delData(id: number): Boolean {
    let arr: any = this.readData();
    let index: number = arr.findIndex((ele: any) => {
      return ele[this.primaryKey] == id;
    });
    if (index > -1) {
      arr.splice(index, 1);
      this.saveData(arr)
      return true;
    } else {
      return false;
    }
  }
}
