для запуска программы используем следующую команду, принимающую 4 аргумента

`nodejs main_2.js [absolute_path_2] [absolute_path_2] [absolute_path_3] [memory]`

`[absolute_path_1]`   - абсолютный путь к файлу, откуда берется исходная информация

`[absolute_path_2]`   - абсолютный путь к файлу, куда будет сохранена отфильтрованная информация

`[absolute_path_3]`   - абсолютный путь к папке, предназначенной для промежуточного хранения обработанной ифномации.

`[memory]`   - объем оперативной памяти в мегаБайтах, предназначенный для решения задачи.

пример:
`nodejs main_2.js /home/user/firstFile.txt  /home/user/final.txt  /home/user/transferDir/  200`

