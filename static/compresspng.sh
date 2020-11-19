for i in `ls *png`
do
        pngquant $i -o $i -f --skip-if-larger -v --speed 1
done
