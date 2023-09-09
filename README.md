# firestore-csv-import

## Usage

```sh
$ npx firestore-csv-import <csv path> -c <collection name> -p <certification path>
```

## Example

```sh
$ npx firestore-csv-import test.csv -c tests -p key.json -k id -t date -i id
```

### Input

```csv
id,name,point
1,hoge,1
2,fuga,2
3,piyo,3
```

### Output

<img width="984" alt="スクリーンショット 2023-09-10 8 10 51" src="https://github.com/ya-s-u/firestore-csv-import/assets/6612882/36ba5d0b-06b3-4ce0-a947-cfcea78be319">

## Options

### `-c`, `--collection`

Firestore collection name

### `-p`, `--path`

Firebase certification file path

### `-k`, `--key`

Firestore id field

### `-t`, `--timestamp`

Firestore timestamp field (default: false)

### `-i`, `--ignore`

Ignore fields \*commma separated

### `-h`, `--help`

Display help for command
