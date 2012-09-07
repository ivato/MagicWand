import numpy as np
import cv2
import sys

img = cv2.imread({{bitmapPath}}, True)
h, w = img.shape[:2]
seed_pt = {{sp}}
mask = np.zeros((h+2, w+2), np.uint8)

def update():
    lo = {{thresholdLow}}
    hi = {{thresholdHigh}}
    cv2.floodFill(img, mask, seed_pt, (255, 255, 255), (lo,lo,lo,lo), (hi,hi,hi,hi), 4 | 255 << 8)
    result = cv2.findContours(mask,cv2.RETR_LIST,cv2.{{chainApprox}})
    # output the result as an array of arrays of {x,y} points  
    print '['
    l = len(result[0])
    for i,a in enumerate(result[0]):
        print '['
        rLen = len(a)
        for j,o in enumerate(a):
            print '{'+'"x":{0},"y":{1}{2}'.format(o[0][0], o[0][1],j< rLen-1 and '},' or '}')
        print i< l-1 and '],' or ']'
    print ']'

update()
