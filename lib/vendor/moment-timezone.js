(function(){function a(a){function c(a){a+="";var b=a.split(":"),c=~a.indexOf("-")?-1:1,d=Math.abs(+b[0]),e=parseInt(b[1],10)||0,f=parseInt(b[2],10)||0;return c*(60*d+e+f/60)}function d(a,b,d,e,f,g,h,i,j,l){this.name=a,this.startYear=+b,this.endYear=+d,this.month=+e,this.day=+f,this.dayRule=+g,this.time=c(h),this.timeRule=+i,this.offset=c(j),this.letters=l||"",this.date=k(this.date),this.weekdayAfter=k(this.weekdayAfter),this.lastWeekday=k(this.lastWeekday)}function e(a,b){this.rule=b,this.start=b.start(a)}function f(a,b){return a.isLast?-1:b.isLast?1:b.start-a.start}function g(a){this.name=a,this.rules=[],this.lastYearRule=k(this.lastYearRule)}function h(b,d,e,f,g,h){var i,j="string"==typeof g?g.split("_"):[9999];for(this.name=b,this.offset=c(d),this.ruleSet=e,this.letters=f,this.lastRule=k(this.lastRule),i=0;i<j.length;i++)j[i]=+j[i];this.until=a.utc(j).subtract("m",c(h))}function i(a,b){return a.until-b.until}function j(a){this.name=n(a),this.displayName=a,this.zones=[],this.zoneAndRule=k(this.zoneAndRule,function(a){return+a})}function k(a,b){var c={};return function(d){var e=b?b.apply(this,arguments):d;return e in c?c[e]:c[e]=a.apply(this,arguments)}}function l(a){var b,c,d;for(b in a)for(d=a[b],c=0;c<d.length;c++)m(b+"	"+d[c])}function m(a){if(y[a])return y[a];var b=a.split(/\s/),c=n(b[0]),e=new d(c,b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8],b[9],b[10]);return y[a]=e,r(c).add(e),e}function n(a){return(a||"").toLowerCase().replace(/\//g,"_")}function o(a){var b,c,d;for(b in a)for(d=a[b],c=0;c<d.length;c++)q(b+"	"+d[c])}function p(a){var b;for(b in a)C[n(b)]=n(a[b])}function q(a){if(A[a])return A[a];var b=a.split(/\s/),c=n(b[0]),d=new h(c,b[1],r(b[2]),b[3],b[4],b[5]);return A[a]=d,s(b[0]).add(d),d}function r(a){return a=n(a),z[a]||(z[a]=new g(a)),z[a]}function s(a){var b=n(a);return C[b]&&(b=C[b]),B[b]||(B[b]=new j(a)),B[b]}function t(a){a&&(a.zones&&o(a.zones),a.rules&&l(a.rules),a.links&&p(a.links))}function u(){var a,b=[];for(a in B)b.push(B[a]);return b}var v,w=a.fn.zoneName,x=a.fn.zoneAbbr,y={},z={},A={},B={},C={},D=1,E=2,F=7,G=8;if(void 0===a.tz)return d.prototype={contains:function(a){return a>=this.startYear&&a<=this.endYear},start:function(b){return b=Math.min(Math.max(b,this.startYear),this.endYear),a.utc([b,this.month,this.date(b),0,this.time])},date:function(a){return this.dayRule===F?this.day:this.dayRule===G?this.lastWeekday(a):this.weekdayAfter(a)},weekdayAfter:function(b){for(var c=this.day,d=a([b,this.month,1]).day(),e=this.dayRule+1-d;c>e;)e+=7;return e},lastWeekday:function(b){var c=this.day,d=c%7,e=a([b,this.month+1,1]).day(),f=a([b,this.month,1]).daysInMonth(),g=f+(d-(e-1))-7*~~(c/7);return d>=e&&(g-=7),g}},e.prototype={equals:function(a){return a&&a.rule===this.rule?Math.abs(a.start-this.start)<864e5:!1}},g.prototype={add:function(a){this.rules.push(a)},ruleYears:function(a,b){var c,d,g,h=a.year(),i=[];for(c=0;c<this.rules.length;c++)d=this.rules[c],d.contains(h)?i.push(new e(h,d)):d.contains(h+1)&&i.push(new e(h+1,d));return i.push(new e(h-1,this.lastYearRule(h-1))),b&&(g=new e(h-1,b.lastRule()),g.start=b.until.clone().utc(),g.isLast=b.ruleSet!==this,i.push(g)),i.sort(f),i},rule:function(a,b,c){var d,e,f,g,h,i=this.ruleYears(a,c),j=0;for(c&&(e=c.offset+c.lastRule().offset,f=9e4*Math.abs(e)),h=i.length-1;h>-1;h--)g=d,d=i[h],d.equals(g)||(c&&!d.isLast&&Math.abs(d.start-c.until)<=f&&(j+=e-b),d.rule.timeRule===E&&(j=b),d.rule.timeRule!==D&&d.start.add("m",-j),j=d.rule.offset+b);for(h=0;h<i.length;h++)if(d=i[h],a>=d.start&&!d.isLast)return d.rule;return v},lastYearRule:function(a){var b,c,d,e=v,f=-1e30;for(b=0;b<this.rules.length;b++)c=this.rules[b],a>=c.startYear&&(d=c.start(a),d>f&&(f=d,e=c));return e}},h.prototype={rule:function(a,b){return this.ruleSet.rule(a,this.offset,b)},lastRule:function(){return this.rule(this.until)},format:function(a){return this.letters.replace("%s",a.letters)}},j.prototype={zoneAndRule:function(a){var b,c,d;for(a=a.clone().utc(),b=0;b<this.zones.length&&(c=this.zones[b],!(a<c.until));b++)d=c;return[c,c.rule(a,d)]},add:function(a){this.zones.push(a),this.zones.sort(i)},format:function(a){var b=this.zoneAndRule(a);return b[0].format(b[1])},offset:function(a){var b=this.zoneAndRule(a);return-(b[0].offset+b[1].offset)}},a.updateOffset=function(a,b){var c;a._z&&(c=a._z.offset(a),Math.abs(c)<16&&(c/=60),a.zone(c,b))},a.fn.tz=function(b){return b?(this._z=s(b),this._z&&a.updateOffset(this),this):this._z?this._z.displayName:void 0},a.fn.zoneName=function(){return this._z?this._z.format(this):w.call(this)},a.fn.zoneAbbr=function(){return this._z?this._z.format(this):x.call(this)},a.momentProperties._z=null,a.tz=function(){var b,c=[],d=arguments.length-1;for(b=0;d>b;b++)c[b]=arguments[b];var e=a.apply(null,c),f=e.zone();return e.tz(arguments[d]),e.add("minutes",e.zone()-f)},a.tz.add=t,a.tz.addRule=m,a.tz.addZone=q,a.tz.zones=u,a.tz.version=b,a.tz.zoneExists=function(a){return s(a).zones.length>0},v=m("- 0 9999 0 0 0 0 0 0"),a}var b="0.0.5";"function"==typeof define&&define.amd?define("moment-timezone",["moment"],a):"undefined"!=typeof module?module.exports=a(require("moment")):"undefined"!=typeof window&&window.moment&&a(window.moment)}).apply(this);

moment.tz.add({
    "zones": {
        "Etc/UTC": [
            "0 - UTC"
        ],
        "Europe/Madrid": [
            "-0:14:44 - LMT 1901_0_1_0 -0:14:44",
            "0 Spain WE%sT 1946_8_30 2",
            "1 Spain CE%sT 1979 1",
            "1 EU CE%sT"
        ]
    },
    "rules": {
        "Spain": [
            "1917 1917 4 5 7 23 2 1 S",
            "1917 1919 9 6 7 23 2 0",
            "1918 1918 3 15 7 23 2 1 S",
            "1919 1919 3 5 7 23 2 1 S",
            "1924 1924 3 16 7 23 2 1 S",
            "1924 1924 9 4 7 23 2 0",
            "1926 1926 3 17 7 23 2 1 S",
            "1926 1929 9 1 6 23 2 0",
            "1927 1927 3 9 7 23 2 1 S",
            "1928 1928 3 14 7 23 2 1 S",
            "1929 1929 3 20 7 23 2 1 S",
            "1937 1937 4 22 7 23 2 1 S",
            "1937 1939 9 1 6 23 2 0",
            "1938 1938 2 22 7 23 2 1 S",
            "1939 1939 3 15 7 23 2 1 S",
            "1940 1940 2 16 7 23 2 1 S",
            "1942 1942 4 2 7 22 2 2 M",
            "1942 1942 8 1 7 22 2 1 S",
            "1943 1946 3 13 6 22 2 2 M",
            "1943 1943 9 3 7 22 2 1 S",
            "1944 1944 9 10 7 22 2 1 S",
            "1945 1945 8 30 7 1 0 1 S",
            "1946 1946 8 30 7 0 0 0",
            "1949 1949 3 30 7 23 0 1 S",
            "1949 1949 8 30 7 1 0 0",
            "1974 1975 3 13 6 23 0 1 S",
            "1974 1975 9 1 0 1 0 0",
            "1976 1976 2 27 7 23 0 1 S",
            "1976 1977 8 0 8 1 0 0",
            "1977 1978 3 2 7 23 0 1 S",
            "1978 1978 9 1 7 1 0 0"
        ],
        "EU": [
            "1977 1980 3 1 0 1 1 1 S",
            "1977 1977 8 0 8 1 1 0",
            "1978 1978 9 1 7 1 1 0",
            "1979 1995 8 0 8 1 1 0",
            "1981 9999 2 0 8 1 1 1 S",
            "1996 9999 9 0 8 1 1 0"
        ]
    },
    "links": {}
});