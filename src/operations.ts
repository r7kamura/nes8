import IOperation from "./IOperation";

const operations: Array<IOperation | null> = [
  {
    addressingMode: "implied",
    cycle: 7,
    name: "BRK"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "ORA"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    name: "ASL"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "ASL"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLC"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    name: "SLO"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "ORA"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    name: "ASL"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "SLO"
  },
  {
    addressingMode: "absolute",
    cycle: 6,
    name: "JSR"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    name: "RLA"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "BIT"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "AND"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    name: "ROL"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "ROL"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "SEC"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "AND"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    name: "ROL"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "RLA"
  },
  {
    addressingMode: "implied",
    cycle: 6,
    name: "RTI"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "EOR"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    name: "LSR"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "LSR"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLI"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "EOR"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    name: "LSR"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "SRE"
  },
  {
    addressingMode: "implied",
    cycle: 6,
    name: "RTS"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "ADC"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    name: "ROR"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "indirect_absolute",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "ROR"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "SEI"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 7,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "ADC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 6,
    name: "ROR"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "RRA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "STA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "SAX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "STY"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "STA"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "STX"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
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
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "STY"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "STA"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    name: "STX"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    name: "SAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "TYA"
  },
  {
    addressingMode: "absolute_y",
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
    addressingMode: "absolute_x",
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
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "LDA"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "LDX"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "LAX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "LDY"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "LDA"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "LDX"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "LDA"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "LAX"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "LDY"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "LDA"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    name: "LDX"
  },
  {
    addressingMode: "zero_page_y",
    cycle: 4,
    name: "LAX"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLV"
  },
  {
    addressingMode: "absolute_y",
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
    addressingMode: "absolute_x",
    cycle: 4,
    name: "LDY"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "LDA"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "LDX"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "LAX"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "CPY"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    name: "DCP"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "CPY"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "CMP"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    name: "DEC"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "DEC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "CLD"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 2,
    name: "DCP"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "CMP"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "DEC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "DCP"
  },
  {
    addressingMode: "immediate",
    cycle: 2,
    name: "CPX"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 6,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 3,
    name: "NOPD"
  },
  {
    addressingMode: "pre_indexed_indirect",
    cycle: 8,
    name: "ISB"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "CPX"
  },
  {
    addressingMode: "zero_page",
    cycle: 3,
    name: "SBC"
  },
  {
    addressingMode: "zero_page",
    cycle: 5,
    name: "INC"
  },
  {
    addressingMode: "zero_page",
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
    addressingMode: "post_indexed_indirect",
    cycle: 5,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "post_indexed_indirect",
    cycle: 8,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPD"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "INC"
  },
  {
    addressingMode: "zero_page_x",
    cycle: 6,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "SED"
  },
  {
    addressingMode: "absolute_y",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "implied",
    cycle: 2,
    name: "NOP"
  },
  {
    addressingMode: "absolute_y",
    cycle: 2,
    name: "ISB"
  },
  {
    addressingMode: "implied",
    cycle: 4,
    name: "NOPI"
  },
  {
    addressingMode: "absolute_x",
    cycle: 4,
    name: "SBC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "INC"
  },
  {
    addressingMode: "absolute_x",
    cycle: 7,
    name: "ISB"
  }
];

export default operations;
