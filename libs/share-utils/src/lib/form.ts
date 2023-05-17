import { from } from 'rxjs';
import { map, mergeMap, reduce } from 'rxjs/operators';


export const formSerializeObject = (form: HTMLFormElement, encodeValue?: boolean): Promise<any> => {
  const result: any = {};

  const arrayFixer: any = {};

  return new Promise((resolve, reject) => {
    from(form.elements).pipe(
      // Convert input file to input text with base64 encoded as the value
      mergeMap((element: any
      ) => {
        // Skip, only proceed if input type file
        if (!element.type || (element.type && element.type !== 'file')) {
          return Promise.resolve(element);
        }

        // Start process file from input value to base64
        return new Promise((resolve2, reject2) => {
          const inputFile = (<HTMLInputElement>element);
          let results: any = [];
          const readerJobs = [];
          if (inputFile.files != null) {
            const files = inputFile.files;
            for (let i = 0; i < files.length; i++) {
              readerJobs.push(
                new Promise((resolve3, reject3) => {

                  const file: File = files[i];
                  const reader: FileReader = new FileReader();

                  reader.onloadend = (e) => {
                    if (files.length === 1) {
                      results = reader.result;
                    } else {
                      results.push(reader.result);
                    }

                    resolve3(results);
                  };

                  reader.onerror = (e) => {
                    resolve3(results);
                  };

                  reader.readAsDataURL(file);
                })
              );
            }
          }


          Promise.all(readerJobs)
            .then(() => {
              const newInputElement = document.createElement('input') as HTMLInputElement;

              newInputElement.name = element.name;
              newInputElement.type = 'text';
              newInputElement.value = JSON.stringify(results);

              resolve2(newInputElement);
            });
        });
      }),
      // Process the form to get the nested-depth json
      map((element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      ) => {
        // Handle array form element
        if (element.name.indexOf('[]') !== -1) {
          if (typeof arrayFixer[element.name] === 'undefined') {
            arrayFixer[element.name] = 0;
          } else {
            arrayFixer[element.name]++;
          }

          console.log([element.name, arrayFixer[element.name]]);

          element.name = element.name.replace('[]', `[${arrayFixer[element.name]}]`);
        }

        // Get the input structure depth to be looped
        const segments = element.name
          .replace(/[\]"']/g, '').split('[');

        let value: any = element.value;

        // Handle select element with multiple attribute
        // get all selected value in array
        if ((<HTMLSelectElement>element).multiple) {
          const selectElement = (<HTMLSelectElement>element);

          value = [];

          for (let i = 0; i < selectElement.options.length; i++) {
            value.push(selectElement.options[i].value);
          }
        }

        if (encodeValue) {
          if (typeof value !== 'string') {
            value = encodeURIComponent(
              JSON.stringify(value)
            );
          } else {
            value = encodeURIComponent(value);
          }
        }

        return from(segments).pipe(
          reduce((context, segment: string, i) => {

            if (typeof context !== 'object') {
              return context;
            }

            if (i === segments.length - 1) {
              if (typeof value === 'string' && value.length === 0) {
                context[segment] = undefined;
              } else {
                context[segment] = value;
              }
            } else {
              if (!context[segment]) {
                context[segment] = {};
              }
            }

            return context[segment];
          }, result)
        ).toPromise();
      })
    ).toPromise().then(() => resolve(result)).catch(err => reject(err));
  });
};

export const isUndefined = (value: any) => {
  return value === undefined;
}

export const isNull = (value: any) => {
  return value === null;
}

export const isObject = (value: any) => {
  return value === Object(value);
}

export const isArray = (value: any) => {
  return Array.isArray(value);
}

export const isDate = (value: any) => {
  return value instanceof Date;
}

export const isBlob = (value: any) => {
  return (
    value &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.slice === 'function'
  );
}

export const isFile = (value: any) => {
  return (
    isBlob(value) &&
    (typeof value.lastModifiedDate === 'object' ||
      typeof value.lastModified === 'number') &&
    typeof value.name === 'string'
  );
}

export const isFormData = (value: any) => {
  return value instanceof FormData;
}

export const objectToFormData = (obj: any, cfg: any, fd: any, pre: any) => {
  if (isFormData(cfg)) {
    pre = fd;
    fd = cfg;
    cfg = null;
  }

  cfg = cfg || {};
  cfg.indices = isUndefined(cfg.indices) ? false : cfg.indices;
  cfg.nulls = isUndefined(cfg.nulls) ? true : cfg.nulls;
  fd = fd || new FormData();

  if (isUndefined(obj)) {
    return fd;
  } else if (isNull(obj)) {
    if (cfg.nulls) {
      fd.append(pre, '');
    }
  } else if (isArray(obj)) {
    if (!obj.length) {
      const key = pre + '[]';

      fd.append(key, '');
    } else {
      obj.forEach(function (value: any, index: any) {
        const key = pre + '[' + (cfg.indices ? index : '') + ']';

        objectToFormData(value, cfg, fd, key);
      });
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString());
  } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach(function (prop) {
      const value = obj[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? pre + '[' + prop + ']' : prop;

      objectToFormData(value, cfg, fd, key);
    });
  } else {
    fd.append(pre, obj);
  }

  return fd;
}

export enum FormControlStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED',
}
