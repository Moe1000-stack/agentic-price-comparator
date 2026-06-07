package com.agenticprice.api;

import com.agenticprice.scraper.PriceResult;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PriceComparisonResponse {
    private String query;
    private int resultCount;
    private List<String> retailersQueried;
    @JsonAlias("retailerWithResults")
    private List<String> retailersWithResults;
    private String bestRetailer;
    private BigDecimal lowestPrice;
    private BigDecimal highestPrice;
    private BigDecimal averagePrice;
    private BigDecimal potentialSavings;
    private List<PriceResult> results;
}
