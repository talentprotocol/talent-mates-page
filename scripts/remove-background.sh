#!/bin/bash

# $1 arg to be the relative path (to the root) containing the images to convert

PATH_TO_CONVERT=$1

cd $PATH_TO_CONVERT

IMAGES_IN_PATH=$( ls )

#convert fem_01.png -fuzz 20% -fill none -draw "matte 0,0 floodfill" result.png

for IMAGE in $IMAGES_IN_PATH
do
    echo "removing background from $IMAGE"
    convert $IMAGE -fuzz 20% -fill none -draw "matte 0,0 floodfill" $IMAGE
done

echo "All images in path were converted"