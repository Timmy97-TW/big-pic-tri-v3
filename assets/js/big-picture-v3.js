/* =============================================================================
   ReLeaf: the big picture, V3 · the triangle
   -----------------------------------------------------------------------------
   Two jobs, and nothing else. The figure is complete and readable before this
   file runs; if it never runs, the only thing lost is the emphasis.

     1  POINTING. One listener on the stage, using pointerover, which bubbles.
        Per-card pointerenter and pointerleave were what made V2 strobe: moving
        from one card to its neighbour fired leave then enter, and the frame in
        between had everything un-held. Handled once on the container it is a
        single event and a single swap with no blank frame.

     2  THE ENTRANCE. The hidden state is added here, never by the stylesheet,
        so scripting off means the drawing is simply there. A 1400 ms fallback
        reveals it if the observer never fires, because a figure is never
        allowed to stay invisible.

   WHAT LIGHTS WHAT. A corner lights the two joints it sits on, the corners on
   the far side of those joints, and the plant, because every corner is for the
   plant. A joint lights its two ends. The plant lights everything; it is what
   the whole figure is for.
   ========================================================================== */
(function () {
  "use strict";

  var tri = document.getElementById("bp3-tri");
  if (!tri) return;

  var corners = Array.prototype.slice.call(tri.querySelectorAll(".bp3-corner"));
  var edges   = Array.prototype.slice.call(tri.querySelectorAll(".bp3-edge"));
  var hub     = tri.querySelector(".bp3-hub");
  var wires   = Array.prototype.slice.call(tri.querySelectorAll(".bp3-wire, .bp3-dot"));
  var lit     = [];

  /* the three joints, as the only description of the triangle's topology that
     exists in this file. Everything else is read off the markup. */
  var JOINTS = edges.map(function (el) {
    return { el: el, id: el.getAttribute("data-edge"), ends: (el.getAttribute("data-ends") || "").split(" ") };
  });

  function cornerFor(id) {
    for (var i = 0; i < corners.length; i++) {
      if (corners[i].getAttribute("data-node") === id) return corners[i];
    }
    return null;
  }

  function wiresFor(id) {
    return wires.filter(function (w) { return w.getAttribute("data-wire") === id; });
  }

  function clear() {
    for (var i = 0; i < lit.length; i++) {
      lit[i].el.classList.remove(lit[i].cls);
    }
    lit = [];
    tri.classList.remove("is-holding");
  }

  function mark(el, cls) {
    if (!el) return;
    el.classList.add(cls);
    lit.push({ el: el, cls: cls });
  }

  function hold(target) {
    clear();
    if (!target) return;

    var node = target.getAttribute("data-node");
    var edge = target.getAttribute("data-edge");

    if (node === "plant") {
      mark(hub, "is-lit");
      corners.forEach(function (c) { mark(c, "is-rel"); });
      JOINTS.forEach(function (j) {
        mark(j.el, "is-rel");
        wiresFor(j.id).forEach(function (w) { mark(w, "is-lit"); });
      });
    } else if (node) {
      mark(target, "is-lit");
      mark(hub, "is-rel");
      JOINTS.forEach(function (j) {
        if (j.ends.indexOf(node) === -1) return;
        mark(j.el, "is-lit");
        wiresFor(j.id).forEach(function (w) { mark(w, "is-lit"); });
        j.ends.forEach(function (end) {
          if (end !== node) mark(cornerFor(end), "is-rel");
        });
      });
    } else if (edge) {
      mark(target, "is-lit");
      wiresFor(edge).forEach(function (w) { mark(w, "is-lit"); });
      (target.getAttribute("data-ends") || "").split(" ").forEach(function (end) {
        mark(cornerFor(end), "is-lit");
      });
      mark(hub, "is-rel");
    } else {
      return;
    }

    tri.classList.add("is-holding");
  }

  function subject(el) {
    return el && el.closest ? el.closest("[data-node], [data-edge]") : null;
  }

  /* pointing. One listener, on the container. */
  tri.addEventListener("pointerover", function (e) { hold(subject(e.target)); });

  /* A tap fires pointerover and then, on most touch browsers, pointerleave a
     moment later, which would take the highlight away before it was read. A
     touch pointer lets go when the next tap lands somewhere else, which the
     document listener below handles. */
  tri.addEventListener("pointerleave", function (e) {
    if (e.pointerType !== "touch") clear();
  });

  /* focus runs the same code path as pointing, so the keyboard reaches all of
     it: three corners, three joints, the plant. */
  tri.addEventListener("focusin", function (e) { hold(subject(e.target)); });
  tri.addEventListener("focusout", function (e) {
    if (!tri.contains(e.relatedTarget)) clear();
  });

  /* a touch outside the figure lets go of it */
  document.addEventListener("pointerdown", function (e) {
    if (!tri.contains(e.target)) clear();
  }, true);

  /* the entrance: one orchestrated moment, on first sight, once. */
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;

  tri.classList.add("is-armed");
  var shown = false;
  function reveal() {
    if (shown) return;
    shown = true;
    tri.classList.add("is-in");

    /* The entrance keyframes fill forwards, and a filling animation outranks
       every normal declaration that follows it, including the whole holding
       state. So once the entrance has run, both classes come off and the
       figure goes back to being styled by ordinary rules. Without this the
       emphasis silently does nothing. */
    window.setTimeout(function () {
      tri.classList.remove("is-armed", "is-in");
    }, 420 + 7 * 55 + 80);
  }

  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { reveal(); io.disconnect(); }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
  io.observe(tri);

  /* a figure is never allowed to stay invisible */
  window.setTimeout(reveal, 1400);
})();
