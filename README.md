# firestore-csv-import

## Usage

```sh
$ npx firestore-csv-import <csv path> -c <collection name> -p <certification path>
```

## Example

```sh
$ npx firestore-csv-import test.csv -c tests -p key.json -k id -t date -i id
```

### Import csv file

```
id,name,point
1,hoge,1
2,fuga,2
3,piyo,3
```

## Options

### `-c`, `--collection`

firestore collection name

### `-p`, `--path`

firebase certification file path

### `-k`, `--key`

firestore id field

### `-t`, `--timestamp`

firestore timestamp field (default: false)

### `-i`, `--ignore`

ignore fields \*commma separated

### `-h`, `--help`

display help for command
