#! /usr/bin/sed -E -i .bak -f
s/<img src=\"imgEAS\/([^<>\"]*)\">/<img src=\"getImage.php?resource=EAS\&id=\1\"\/>/g
