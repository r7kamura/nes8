import IOperation from "./IOperation";

const operations: Array<IOperation | null> = [
  {
    addressingMode: "implied",
    cycle: 7,
    name: "BRK"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 8,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "ORA"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "ASL"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "PHP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "ORA"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    name: "ASL"
  },
  null,
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "ASL"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "SLO"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BPL"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 8,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "ASL"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLC"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absoluteY",
    cycle: 7,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "absoluteX",
    cycle: 6,
    name: "ASL"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "SLO"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "JSR"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 8,
    name: "RLA"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "BIT"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "AND"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "ROL"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "PLP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "AND"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    name: "ROL"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "BIT"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "ROL"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "RLA"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BMI"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 8,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "ROL"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "SEC"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absoluteY",
    cycle: 7,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "absoluteX",
    cycle: 6,
    name: "ROL"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 6,
    name: "RTI"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 8,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "EOR"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "LSR"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "PHA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "EOR"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    name: "LSR"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 3,
    name: "JMP"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "LSR"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "SRE"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BVC"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 8,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "LSR"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLI"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absoluteY",
    cycle: 7,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "absoluteX",
    cycle: 6,
    name: "LSR"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 6,
    name: "RTS"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 8,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "ADC"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "ROR"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "PLA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "ADC"
  },
  {
    addressingMode: "accumulator",
    cycle: 2,
    name: "ROR"
  },
  null,
  {
    addressingMode: "indirectAbsolute",
    cycle: 5,
    name: "JMP"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "ROR"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "RRA"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BVS"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 8,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "ROR"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "SEI"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absoluteY",
    cycle: 7,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "absoluteX",
    cycle: 6,
    name: "ROR"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "SAX"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "STY"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "STA"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "STX"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "SAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "DEY"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TXA"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "STY"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "STA"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "STX"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "SAX"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BCC"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 6,
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  null,
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "STY"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "STA"
  },
  {
    addressingMode: "zeroPageY",
    cycle: 4,
    name: "STX"
  },
  {
    addressingMode: "zeroPageY",
    cycle: 4,
    name: "SAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TYA"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TXS"
  },
  null,
  null,
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "STA"
  },
  null,
  null,
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "LDY"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "LDA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "LDX"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "LAX"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "LDY"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "LDA"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "LDX"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "LAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TAY"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TAX"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "LDY"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "LDA"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "LDX"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "LAX"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BCS"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "LAX"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "LDY"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "LDA"
  },
  {
    addressingMode: "zeroPageY",
    cycle: 4,
    name: "LDX"
  },
  {
    addressingMode: "zeroPageY",
    cycle: 4,
    name: "LAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLV"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TSX"
  },
  null,
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "LDY"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "LDA"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "LDX"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "LAX"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "CPY"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 8,
    name: "DCP"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "CPY"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "CMP"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "DEC"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "INY"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "DEX"
  },
  null,
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "CPY"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "DEC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "DCP"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BNE"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 8,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "DEC"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLD"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absoluteY",
    cycle: 2,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "DEC"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "DCP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "CPX"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 6,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "preIndexedIndirect",
    cycle: 8,
    name: "ISB"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "CPX"
  },
  {
    addressingMode: "zeroPage",
    cycle: 3,
    name: "SBC"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "INC"
  },
  {
    addressingMode: "zeroPage",
    cycle: 5,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "INX"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "SBC"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "CPX"
  },
  {
    addressingMode: "absolute",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "INC"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "ISB"
  },
  {
    addressingMode: "relative",
    cycle: 2,
    name: "BEQ"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 5,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "postIndexedIndirect",
    cycle: 8,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "INC"
  },
  {
    addressingMode: "zeroPageX",
    cycle: 6,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "SED"
  },
  {
    addressingMode: "absoluteY",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absoluteY",
    cycle: 2,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absoluteX",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "INC"
  },
  {
    addressingMode: "absoluteX",
    cycle: 7,
    name: "ISB"
  }
];

export default operations;
