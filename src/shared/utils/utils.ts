export const ArrayDelete = (array: Array<any>, index: number) => {
    if (array.length === 1) { return []; }
    if(index === undefined || index === null || index === -1) { return array };
    return [
      ...array.slice(0, index),
      ...array.slice(index + 1)
    ];
  };
  
  export const ArrayInsert = (array: Array<any>, element: any, index?: number) => {
    if (index !== undefined) {
      return [
        ...array.slice(0, index),
        {
          ...element,
        },
        ...array.slice(index + 1)
      ];
    } else {
        return [...array, element];
    }
  };
  
  export const ArrayUpdateBulk = (array: Array<any>, bulkArray: Array<any>, key: string) => {
    return array.map(
      currentElem => {
        const updatedDataset = bulkArray.find(newElem => newElem[key] === currentElem[key]);
        return updatedDataset ? {...currentElem, ...updatedDataset} : {...currentElem};
      }
    )
  };
  
  export const ArrayInsertAndMove = (array: Array<any>, element: any, index?: number) => {
    if (index !== undefined) {
      return [ ...array.slice(0, index), element, ...array.slice(index) ];
    } else {
      return [...array, element];
    }
  };
  
  export const ArrayMoveElement = (array: Array<any>, oldIndex: number, newIndex: number) => {
    const _array = [...array];
  
    if (newIndex >= _array.length) {
      var k = newIndex - _array.length + 1;
      while (k--) {
          _array.push(undefined);
      }
    }
  
    _array.splice(newIndex, 0, _array.splice(oldIndex, 1)[0]);
    return _array;
  };

export function debounce(fn: Function, time = 500) {
  let timeout;

  return function (...args) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}