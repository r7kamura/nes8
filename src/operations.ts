import Operation from "./operation";

const operations: Array<Operation | null> = [
  {
    fullName: "BRK",
    name: "BRK",
    addressingMode: "implied",
    cycle: 7
  },
  {
    fullName: "ORA_INDX",
    name: "ORA",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SLO_INDX",
    name: "SLO",
    addressingMode: "pre_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 3
  },
  {
    fullName: "ORA_ZERO",
    name: "ORA",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "ASL_ZERO",
    name: "ASL",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "SLO_ZERO",
    name: "SLO",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "PHP",
    name: "PHP",
    addressingMode: "implied",
    cycle: 3
  },
  {
    fullName: "ORA_IMM",
    name: "ORA",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "ASL",
    name: "ASL",
    addressingMode: "accumulator",
    cycle: 2
  },
  null,
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "ORA_ABS",
    name: "ORA",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "ASL_ABS",
    name: "ASL",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "SLO_ABS",
    name: "SLO",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "BPL",
    name: "BPL",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "ORA_INDY",
    name: "ORA",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SLO_INDY",
    name: "SLO",
    addressingMode: "post_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "ORA_ZEROX",
    name: "ORA",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "ASL_ZEROX",
    name: "ASL",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "SLO_ZEROX",
    name: "SLO",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "CLC",
    name: "CLC",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "ORA_ABSY",
    name: "ORA",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SLO_ABSY",
    name: "SLO",
    addressingMode: "absolute_y",
    cycle: 7
  },
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "ORA_ABSX",
    name: "ORA",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "ASL_ABSX",
    name: "ASL",
    addressingMode: "absolute_x",
    cycle: 6
  },
  {
    fullName: "SLO_ABSX",
    name: "SLO",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "JSR_ABS",
    name: "JSR",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "AND_INDX",
    name: "AND",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "RLA_INDX",
    name: "RLA",
    addressingMode: "pre_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "BIT_ZERO",
    name: "BIT",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "AND_ZERO",
    name: "AND",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "ROL_ZERO",
    name: "ROL",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "RLA_ZERO",
    name: "RLA",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "PLP",
    name: "PLP",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "AND_IMM",
    name: "AND",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "ROL",
    name: "ROL",
    addressingMode: "accumulator",
    cycle: 2
  },
  null,
  {
    fullName: "BIT_ABS",
    name: "BIT",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "AND_ABS",
    name: "AND",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "ROL_ABS",
    name: "ROL",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "RLA_ABS",
    name: "RLA",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "BMI",
    name: "BMI",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "AND_INDY",
    name: "AND",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "RLA_INDY",
    name: "RLA",
    addressingMode: "post_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "AND_ZEROX",
    name: "AND",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "ROL_ZEROX",
    name: "ROL",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "RLA_ZEROX",
    name: "RLA",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "SEC",
    name: "SEC",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "AND_ABSY",
    name: "AND",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "RLA_ABSY",
    name: "RLA",
    addressingMode: "absolute_y",
    cycle: 7
  },
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "AND_ABSX",
    name: "AND",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "ROL_ABSX",
    name: "ROL",
    addressingMode: "absolute_x",
    cycle: 6
  },
  {
    fullName: "RLA_ABSX",
    name: "RLA",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "RTI",
    name: "RTI",
    addressingMode: "implied",
    cycle: 6
  },
  {
    fullName: "EOR_INDX",
    name: "EOR",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SRE_INDX",
    name: "SRE",
    addressingMode: "pre_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 3
  },
  {
    fullName: "EOR_ZERO",
    name: "EOR",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "LSR_ZERO",
    name: "LSR",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "SRE_ZERO",
    name: "SRE",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "PHA",
    name: "PHA",
    addressingMode: "implied",
    cycle: 3
  },
  {
    fullName: "EOR_IMM",
    name: "EOR",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "LSR",
    name: "LSR",
    addressingMode: "accumulator",
    cycle: 2
  },
  null,
  {
    fullName: "JMP_ABS",
    name: "JMP",
    addressingMode: "absolute",
    cycle: 3
  },
  {
    fullName: "EOR_ABS",
    name: "EOR",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "LSR_ABS",
    name: "LSR",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "SRE_ABS",
    name: "SRE",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "BVC",
    name: "BVC",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "EOR_INDY",
    name: "EOR",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SRE_INDY",
    name: "SRE",
    addressingMode: "post_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "EOR_ZEROX",
    name: "EOR",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "LSR_ZEROX",
    name: "LSR",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "SRE_ZEROX",
    name: "SRE",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "CLI",
    name: "CLI",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "EOR_ABSY",
    name: "EOR",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SRE_ABSY",
    name: "SRE",
    addressingMode: "absolute_y",
    cycle: 7
  },
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "EOR_ABSX",
    name: "EOR",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "LSR_ABSX",
    name: "LSR",
    addressingMode: "absolute_x",
    cycle: 6
  },
  {
    fullName: "SRE_ABSX",
    name: "SRE",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "RTS",
    name: "RTS",
    addressingMode: "implied",
    cycle: 6
  },
  {
    fullName: "ADC_INDX",
    name: "ADC",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "RRA_INDX",
    name: "RRA",
    addressingMode: "pre_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 3
  },
  {
    fullName: "ADC_ZERO",
    name: "ADC",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "ROR_ZERO",
    name: "ROR",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "RRA_ZERO",
    name: "RRA",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "PLA",
    name: "PLA",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "ADC_IMM",
    name: "ADC",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "ROR",
    name: "ROR",
    addressingMode: "accumulator",
    cycle: 2
  },
  null,
  {
    fullName: "JMP_INDABS",
    name: "JMP",
    addressingMode: "indirect_absolute",
    cycle: 5
  },
  {
    fullName: "ADC_ABS",
    name: "ADC",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "ROR_ABS",
    name: "ROR",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "RRA_ABS",
    name: "RRA",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "BVS",
    name: "BVS",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "ADC_INDY",
    name: "ADC",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "RRA_INDY",
    name: "RRA",
    addressingMode: "post_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "ADC_ZEROX",
    name: "ADC",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "ROR_ZEROX",
    name: "ROR",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "RRA_ZEROX",
    name: "RRA",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "SEI",
    name: "SEI",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "ADC_ABSY",
    name: "ADC",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "RRA_ABSY",
    name: "RRA",
    addressingMode: "absolute_y",
    cycle: 7
  },
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "ADC_ABSX",
    name: "ADC",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "ROR_ABSX",
    name: "ROR",
    addressingMode: "absolute_x",
    cycle: 6
  },
  {
    fullName: "RRA_ABSX",
    name: "RRA",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "STA_INDX",
    name: "STA",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SAX_INDX",
    name: "SAX",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "STY_ZERO",
    name: "STY",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "STA_ZERO",
    name: "STA",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "STX_ZERO",
    name: "STX",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "SAX_ZERO",
    name: "SAX",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "DEY",
    name: "DEY",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "TXA",
    name: "TXA",
    addressingMode: "implied",
    cycle: 2
  },
  null,
  {
    fullName: "STY_ABS",
    name: "STY",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "STA_ABS",
    name: "STA",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "STX_ABS",
    name: "STX",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "SAX_ABS",
    name: "SAX",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "BCC",
    name: "BCC",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "STA_INDY",
    name: "STA",
    addressingMode: "post_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  null,
  {
    fullName: "STY_ZEROX",
    name: "STY",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "STA_ZEROX",
    name: "STA",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "STX_ZEROY",
    name: "STX",
    addressingMode: "zero_page_y",
    cycle: 4
  },
  {
    fullName: "SAX_ZEROY",
    name: "SAX",
    addressingMode: "zero_page_y",
    cycle: 4
  },
  {
    fullName: "TYA",
    name: "TYA",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "STA_ABSY",
    name: "STA",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "TXS",
    name: "TXS",
    addressingMode: "implied",
    cycle: 2
  },
  null,
  null,
  {
    fullName: "STA_ABSX",
    name: "STA",
    addressingMode: "absolute_x",
    cycle: 4
  },
  null,
  null,
  {
    fullName: "LDY_IMM",
    name: "LDY",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "LDA_INDX",
    name: "LDA",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "LDX_IMM",
    name: "LDX",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "LAX_INDX",
    name: "LAX",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "LDY_ZERO",
    name: "LDY",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "LDA_ZERO",
    name: "LDA",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "LDX_ZERO",
    name: "LDX",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "LAX_ZERO",
    name: "LAX",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "TAY",
    name: "TAY",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "LDA_IMM",
    name: "LDA",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "TAX",
    name: "TAX",
    addressingMode: "implied",
    cycle: 2
  },
  null,
  {
    fullName: "LDY_ABS",
    name: "LDY",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "LDA_ABS",
    name: "LDA",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "LDX_ABS",
    name: "LDX",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "LAX_ABS",
    name: "LAX",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "BCS",
    name: "BCS",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "LDA_INDY",
    name: "LDA",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "LAX_INDY",
    name: "LAX",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "LDY_ZEROX",
    name: "LDY",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "LDA_ZEROX",
    name: "LDA",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "LDX_ZEROY",
    name: "LDX",
    addressingMode: "zero_page_y",
    cycle: 4
  },
  {
    fullName: "LAX_ZEROY",
    name: "LAX",
    addressingMode: "zero_page_y",
    cycle: 4
  },
  {
    fullName: "CLV",
    name: "CLV",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "LDA_ABSY",
    name: "LDA",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "TSX",
    name: "TSX",
    addressingMode: "implied",
    cycle: 2
  },
  null,
  {
    fullName: "LDY_ABSX",
    name: "LDY",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "LDA_ABSX",
    name: "LDA",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "LDX_ABSY",
    name: "LDX",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "LAX_ABSY",
    name: "LAX",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "CPY_IMM",
    name: "CPY",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "CMP_INDX",
    name: "CMP",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "DCP_INDX",
    name: "DCP",
    addressingMode: "pre_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "CPY_ZERO",
    name: "CPY",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "CMP_ZERO",
    name: "CMP",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "DEC_ZERO",
    name: "DEC",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "DCP_ZERO",
    name: "DCP",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "INY",
    name: "INY",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "CMP_IMM",
    name: "CMP",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "DEX",
    name: "DEX",
    addressingMode: "implied",
    cycle: 2
  },
  null,
  {
    fullName: "CPY_ABS",
    name: "CPY",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "CMP_ABS",
    name: "CMP",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "DEC_ABS",
    name: "DEC",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "DCP_ABS",
    name: "DCP",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "BNE",
    name: "BNE",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "CMP_INDY",
    name: "CMP",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "DCP_INDY",
    name: "DCP",
    addressingMode: "post_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "CMP_ZEROX",
    name: "CMP",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "DEC_ZEROX",
    name: "DEC",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "DCP_ZEROX",
    name: "DCP",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "CLD",
    name: "CLD",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "CMP_ABSY",
    name: "CMP",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "DCP_ABSY",
    name: "DCP",
    addressingMode: "absolute_y",
    cycle: 2
  },
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "CMP_ABSX",
    name: "CMP",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "DEC_ABSX",
    name: "DEC",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "DCP_ABSX",
    name: "DCP",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "CPX_IMM",
    name: "CPX",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "SBC_INDX",
    name: "SBC",
    addressingMode: "pre_indexed_indirect",
    cycle: 6
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 3
  },
  {
    fullName: "ISB_INDX",
    name: "ISB",
    addressingMode: "pre_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "CPX_ZERO",
    name: "CPX",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "SBC_ZERO",
    name: "SBC",
    addressingMode: "zero_page",
    cycle: 3
  },
  {
    fullName: "INC_ZERO",
    name: "INC",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "ISB_ZERO",
    name: "ISB",
    addressingMode: "zero_page",
    cycle: 5
  },
  {
    fullName: "INX",
    name: "INX",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SBC_IMM",
    name: "SBC",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SBC_IMM",
    name: "SBC",
    addressingMode: "immediate",
    cycle: 2
  },
  {
    fullName: "CPX_ABS",
    name: "CPX",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "SBC_ABS",
    name: "SBC",
    addressingMode: "absolute",
    cycle: 4
  },
  {
    fullName: "INC_ABS",
    name: "INC",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "ISB_ABS",
    name: "ISB",
    addressingMode: "absolute",
    cycle: 6
  },
  {
    fullName: "BEQ",
    name: "BEQ",
    addressingMode: "relative",
    cycle: 2
  },
  {
    fullName: "SBC_INDY",
    name: "SBC",
    addressingMode: "post_indexed_indirect",
    cycle: 5
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "ISB_INDY",
    name: "ISB",
    addressingMode: "post_indexed_indirect",
    cycle: 8
  },
  {
    fullName: "NOPD",
    name: "NOPD",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "SBC_ZEROX",
    name: "SBC",
    addressingMode: "zero_page_x",
    cycle: 4
  },
  {
    fullName: "INC_ZEROX",
    name: "INC",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "ISB_ZEROX",
    name: "ISB",
    addressingMode: "zero_page_x",
    cycle: 6
  },
  {
    fullName: "SED",
    name: "SED",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "SBC_ABSY",
    name: "SBC",
    addressingMode: "absolute_y",
    cycle: 4
  },
  {
    fullName: "NOP",
    name: "NOP",
    addressingMode: "implied",
    cycle: 2
  },
  {
    fullName: "ISB_ABSY",
    name: "ISB",
    addressingMode: "absolute_y",
    cycle: 2
  },
  {
    fullName: "NOPI",
    name: "NOPI",
    addressingMode: "implied",
    cycle: 4
  },
  {
    fullName: "SBC_ABSX",
    name: "SBC",
    addressingMode: "absolute_x",
    cycle: 4
  },
  {
    fullName: "INC_ABSX",
    name: "INC",
    addressingMode: "absolute_x",
    cycle: 7
  },
  {
    fullName: "ISB_ABSX",
    name: "ISB",
    addressingMode: "absolute_x",
    cycle: 7
  }
];

export default operations;
