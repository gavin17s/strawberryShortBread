#!/usr/bin/env python3

def roundTo1or3(num):
    if num >= 0:
            if num >= 2:
                num = 3
            else:
                num = 2
    else:
        if num <= -2:
            num = 0
        else:
            num = 1
    return num

def main():
    with open("314q2list", "r") as f:
        coords = iter(f.read().splitlines())
        for line in coords:
            line2 = next(coords)
            row = line.split(",")
            row2 = line2.split(",")
            
            row[0] = float(row[0])
            row[1] = float(row[1])
            row2[0] = float(row2[0])
            row2[1] = float(row2[1])
            
            #qamPoints = [[0b0000,0b0100,0b1100,0b1000],
            #            [0b0001,0b0101,0b1101,0b1001],
            #            [0b0011,0b0111,0b1111,0b1011],
            #            [0b0010,0b0110,0b1110,0b1010]]  
            
            qamPoints = [[0b0010,0b0110,0b1110,0b1010],
                        [0b0011,0b0111,0b1111,0b1011],
                        [0b0001,0b0101,0b1101,0b1001],
                        [0b0000,0b0100,0b1100,0b1000]]
            
            inum1 = roundTo1or3(row[0])
            qnum1 = roundTo1or3(row[1])
            inum2 = roundTo1or3(row2[0])
            qnum2 = roundTo1or3(row2[1])
            
            combinedBin = str(format(qamPoints[qnum1][inum1], '04b')) + str(format(qamPoints[qnum2][inum2], '04b'))

            print(chr(int(combinedBin, 2)))
            
main()
